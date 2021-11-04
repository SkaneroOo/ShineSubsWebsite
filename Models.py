from pydantic import BaseModel
from typing import Optional


class Vote(BaseModel):
    bot: str
    user: str
    type: str
    isWeekend: bool
    query: Optional[str]


class DBot(BaseModel):
    txn_id: str
    price: str
    currency: str
    buyer_email: str
    seller_email: str
    status: str
    recurring: Optional[int]
    guild_id: str
    valid_price: Optional[int]
    seller_customs: dict
    role_id: str
    raw_buyer_id: str
    product_id: Optional[str]


class OAuth2(BaseModel):
    access_token: str
    expires_in: int
    refresh_token: str
    scope: str
    token_type: str
