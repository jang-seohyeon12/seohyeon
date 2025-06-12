from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # debug=True는 개발 모드, 코드 변경 시 자동 재시작
    # host='0.0.0.0'은 외부 접속 허용 (Gitpod에서 필요)
    # port=5000은 기본 포트
    app.run(debug=True, host='0.0.0.0', port=5000)
    