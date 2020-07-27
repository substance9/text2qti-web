from flask import Flask, Blueprint, jsonify, make_response, send_from_directory, request
from flask_cors import CORS
import os
from os.path import exists, join
import random
from datetime import datetime
import string

from constants import CONSTANTS
from pathlib import Path
from werkzeug.utils import secure_filename

from text2qti.err import Text2qtiError
from text2qti.config import Config
from text2qti.quiz import Quiz
from text2qti.qti import QTI

import traceback

app = Flask(__name__)
CORS(app)
api = Blueprint('api', __name__)

converted_file_dir = app.static_folder
cwd = Path.cwd()
temp_upload_md_file_dir = cwd / 'temp_upload_md'
generated_qti_dir = cwd / 'generated_qti'

ALLOWED_EXTENSIONS = {'txt', 'md'}

def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_new_filename(original_filename):
    now = datetime.now()
    timestamp_str = now.strftime("%Y%m%d-%H%M%S")

    random_str = get_random_string(8)

    filename_secs = original_filename.rsplit('.', 1)
    filename_wo_ext = filename_secs[0]
    file_ext = filename_secs[1]
    new_filename = '_'.join([filename_wo_ext,timestamp_str,random_str]) + '.' + file_ext

    return new_filename

@api.route('/mdtext', methods=['POST'])
def process_mdtext():
    # print("mdtext request" , flush=True)
    content = request.json
    mdtext = content['mdtext']
    error = ""
    output_filename = ""
    try:
        output_filename = process_md_text(mdtext)
    except Exception as e:
        #error = str(e.print)
        error = traceback.format_exc()
        return_dict = {'err':error}
        return jsonify(return_dict), 500
    
    return_dict = {'filename': output_filename}
    # print(file_dict , flush=True)
    return jsonify(return_dict)

@api.route('/mdfile', methods=['POST'])
def process_mdfile():
    # print("mdfile request" , flush=True)
    file = request.files['MDFile']
    if not allowed_file(file.filename):
        return jsonify({'err':"File type is not supported"}), 500
    filename = secure_filename(file.filename) 
    new_filename = get_new_filename(filename)
    file.save(temp_upload_md_file_dir/new_filename)
    error = ""
    output_filename = ""
    try:
        output_filename = process_md_file(temp_upload_md_file_dir/new_filename)
    except Exception as e:
        #error = str(e.print)
        error = traceback.format_exc()
        return_dict = {'err':error}
        return jsonify(return_dict), 500
    
    return_dict = {'filename': output_filename}
    # print(file_dict , flush=True)
    return jsonify(return_dict)


@api.route('/qtifile/<filename_wo_suffix>', methods=['GET'])
def get_file(filename_wo_suffix):
    filename = filename_wo_suffix + '.zip'
    # print("request file " + filename, flush=True)
    return send_from_directory(directory=generated_qti_dir, filename=filename, as_attachment=True)

# Catching all routes
# This route is used to serve all the routes in the frontend application after deployment.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    file_to_serve = path if path and exists(join(app.static_folder, path)) else 'index.html'
    return send_from_directory(app.static_folder, file_to_serve)

# Error Handler
@app.errorhandler(404)
def page_not_found(error):
    json_response = jsonify({'error': 'Page not found'})
    return make_response(json_response, CONSTANTS['HTTP_STATUS']['404_NOT_FOUND'])

app.register_blueprint(api, url_prefix='/api')

def process_md_file(file_path):
    try:
        text = file_path.read_text(encoding='utf-8-sig')  # Handle BOM for Windows
    except FileNotFoundError:
        raise Text2qtiError(f'File "{file_path}" does not exist')
    except PermissionError as e:
        raise Text2qtiError(f'File "{file_path}" cannot be read due to permission error:\n{e}')
    except UnicodeDecodeError as e:
        raise Text2qtiError(f'File "{file_path}" is not encoded in valid UTF-8:\n{e}')
    return process_md_text(text,file_path.name)

def process_md_text(text, output_filename=None):
    if output_filename is None:
        now = datetime.now()
        timestamp_str = now.strftime("%Y%m%d-%H%M%S")
        random_str = get_random_string(8)
        output_filename = '_'.join(["qti",timestamp_str,random_str])
    else:
        output_filename = output_filename.rsplit('.',1)[0]

    config = Config()
    
    quiz = Quiz(text, config=config, source_name=output_filename)
    qti = QTI(quiz)
    qti.save(generated_qti_dir / f'{output_filename}.zip')
    
    
    return output_filename

if __name__ == '__main__':
    Path.mkdir(temp_upload_md_file_dir, exist_ok=True)
    Path.mkdir(generated_qti_dir, exist_ok=True)
    app.run(host='0.0.0.0',port=CONSTANTS['PORT'])
