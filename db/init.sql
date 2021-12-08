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
    email text UNIQUE,
    phone text UNIQUE,
    password text,
    details json,
    resetcount int NOT NULL DEFAULT 0
);

CREATE TYPE collection_type_enum AS ENUM ('AUTOMATIC', 'MANUAL');
CREATE TYPE groupby_enum AS ENUM ('PRODUCER', 'TERRITORY', 'REGION', 'COUNTRY');

CREATE SEQUENCE position_sequence START 1;

CREATE TABLE IF NOT EXISTS collections (
    id char(32) NOT NULL PRIMARY KEY default get_random_string(32),
    parent char(32) REFERENCES collections(id),
    title text NOT NULL,
    collection_type collection_type_enum,
    conditions json,
    groupby groupby_enum,
    position int
);

CREATE TABLE IF NOT EXISTS territories (
    id char(32) NOT NULL PRIMARY KEY default get_random_string(32),
    country text NOT NULL,
    region text,
    territory text,
    UNIQUE (country, region, territory)
);

CREATE TABLE IF NOT EXISTS producers (
    id char(32) NOT NULL PRIMARY KEY default get_random_string(32),
    title text NOT NULL,
    territory char(32) REFERENCES territories(id)
);

CREATE TABLE IF NOT EXISTS products (
    id char(32) NOT NULL PRIMARY KEY default get_random_string(32),
    details json NOT NULL,
    producer char(32) REFERENCES producers(id),
    public boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS product_collection (
  product char(32) REFERENCES products(id),
  collection char(32) REFERENCES collections(id),
  collection_title text NOT NULL
);

INSERT INTO users (email, password, role, details) VALUES ('admin@test.com', '$2a$10$Gbqbh3ncP66OAm.0DYPyRO94nIUBWE.ABOUUh.ivYbSJezutwycOS', 'ADMIN', '{"name":"Admin", "surname":"Test"}'); -- password: password
