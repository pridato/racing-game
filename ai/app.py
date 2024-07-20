from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/calculate-move', methods=['POST'])
def calculate_move():
    data = request.get_json()
    # Lógica de IA para calcular el movimiento del oponente
    move = {'x': 10, 'y': 20}  # Ejemplo de movimiento calculado
    return jsonify(move)


if __name__ == '__main__':
    app.run(port=5000)
