DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",  # 엔진
        "NAME": "unsik_db",  # 데이터베이스 이름
        "USER": "root",  # 사용자
        "PASSWORD": "1234",  # 비밀번호
        "HOST": "localhost",  # 호스트
        "PORT": "3306",  # 포트번호
    }
}

# SECRET_KEY
# 1. settings.py의 secret_key는 주석처리
# 2. 복사해서 여기에서 사용
SECRET_KEY = "django-insecure-$a^cpqh78bef!t+z(t=zqzns*#d63jg(#h+kjka=6sg73113b3"