from flask import Flask, request, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    query = request.form['query']
    # Hier würden Sie die Logik implementieren, um die Anfrage an Microsoft 365 Copilot zu senden
    # und die Antwort zu verarbeiten.
    response = "Hier würde die Antwort von Copilot erscheinen."
    return render_template('search.html', response=response)

if __name__ == '__main__':
    app.run()
