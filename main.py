from flask import Flask, render_template, url_for, request, session, redirect, send_file, make_response, abort, Markup


app = Flask(__name__)
app.secret_key = 'mysecret'

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/main')
def main():
    return render_template('home.html')

# @app.route('/user')
# def user():
#     return render_template('user.html')

if __name__ == '__main__':
    app.run(debug=True)
