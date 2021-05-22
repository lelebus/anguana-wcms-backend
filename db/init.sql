create or replace function get_random_string(length integer) returns text as
$$
declare
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  -- chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result text := '';
  i integer := 0;
begin
  if length < 0 then
    raise exception 'Given length cannot be less than 0';
  end if;
  for i in 1..length loop
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  end loop;
  return result;
end;
$$ language 'plpgsql';

CREATE TABLE IF NOT EXISTS users (
    id char(32) NOT NULL PRIMARY KEY default get_random_string(32),
    role varchar,
    language text NOT NULL,
    email text UNIQUE,
    phone text UNIQUE,
    password text,
    details json,
    resetcount int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
    id char(32) NOT NULL PRIMARY KEY default get_random_string(32),
    parent char(32) REFERENCES products(id),
    details json NOT NULL,
    imageUrl text,
    public boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS orders (
    id char(32) NOT NULL PRIMARY KEY default get_random_string(32),
    customer char(32) NOT NULL REFERENCES users(id),
    deliveryDate date,
    deliverySlot json,
    notes text,
    price float,
    createdBy char(32) NOT NULL REFERENCES users(id),
    createdOn timestamp NOT NULL default CURRENT_TIMESTAMP,
    status json NOT NULL,
    last_updated timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS order_details (
  order_id char(32) NOT NULL REFERENCES orders(id),
  product char(32) NOT NULL REFERENCES products(id),
  quantity float NOT NULL,
  price float
);

INSERT INTO users (email, password, role, details) VALUES ('tester@email.com', '$2a$10$Gbqbh3ncP66OAm.0DYPyRO94nIUBWE.ABOUUh.ivYbSJezutwycOS', 'ADMIN', '{"name":"Tester", "surname":"Admin"}'); -- password: password
INSERT INTO users (email, password, role, details) VALUES ('h.trettl@endian.com', '$2a$10$Gbqbh3ncP66OAm.0DYPyRO94nIUBWE.ABOUUh.ivYbSJezutwycOS', 'ADMIN', '{"name":"Harry", "surname":"Trettl"}'); -- password: password

CREATE TABLE IF NOT EXISTS settings (
    key text NOT NULL PRIMARY KEY,
    value json NOT NULL
);

CREATE TABLE IF NOT EXISTS notifications (
    key text NOT NULL,
    language text NOT NULL,
    text text NOT NULL,
    UNIQUE (key, language)
);
