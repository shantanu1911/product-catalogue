import sqlite3
import base64
from flask import Flask, request
from flask_cors import CORS
from constants import DB_NAME

app = Flask(__name__)
CORS(app=app)


def database_settings():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS items
                (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category TEXT, description TEXT, price REAL, image TEXT)''')
    conn.commit()

    
@app.route('/', methods=['GET','POST'])
def hello_world():
    if request.method == 'GET':
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM items")
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        result_list = []
        for row in rows:
            result_dict = {}
            for i, value in enumerate(row):
                result_dict[columns[i]] = value
            result_list.append(result_dict)
        cursor.close()
        conn.close()
        return result_list
    
    if request.method == 'POST':
        name = request.form.get('name')
        category = request.form.get('category')
        description = request.form.get('description')
        price = request.form.get('price')
        image_file = request.files.get('image')

        if image_file:
            image_data = base64.b64encode(image_file.read()).decode('utf-8')
        else:
            image_data = None

        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute("INSERT INTO items (name, category, description, price, image) VALUES (?, ?, ?, ?, ?)",
                (name, category, description, price, image_data))
        conn.commit()
        conn.close()

        return 'Data saved successfully'


@app.route('/product/<int:id>')
def get_product_by_id(id):
    if request.method == 'GET':
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM items where id=?", (id,))
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
        result_list = []
        for row in rows:
            result_dict = {}
            for i, value in enumerate(row):
                result_dict[columns[i]] = value
            result_list.append(result_dict)
        cursor.close()
        conn.close()
        return result_list[0]
    
    
if __name__ == '__main__':
    database_settings()
    app.run(debug=True, port=8000)
