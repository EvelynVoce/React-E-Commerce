from pydantic import BaseModel


class User(BaseModel):
    username: str = ""
    password: str = ""

    @classmethod
    def from_dict(cls, user_dict):
        return cls(username=user_dict.get('username', ''), password=user_dict.get('password', ''))
