USE master;
GO

CREATE DATABASE ajmarketing ON
(NAME = ajmarketing_dat,
    FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ajmarketing.mdf',
    SIZE = 10,
    MAXSIZE = 50,
    FILEGROWTH = 5)
LOG ON
(NAME = ajmarketing_log,
    FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\ajmarketing.ldf',
    SIZE = 5 MB,
    MAXSIZE = 25 MB,
    FILEGROWTH = 5 MB);
GO

USE ajmarketing;

CREATE TABLE paises (
  pais_ID int NOT NULL PRIMARY KEY IDENTITY,

  pais VARCHAR(56) NOT NULL,
  ddi VARCHAR(3),

  ativo BIT NOT NULL,
  data_cadastro DATETIME NOT NULL,
  data_ult_alt DATETIME NOT NULL,
)

CREATE TABLE estados (
  estado_ID int NOT NULL PRIMARY KEY IDENTITY,
  pais_ID int NOT NULL, -- Foreign Key

  estado VARCHAR(56) NOT NULL,
  uf VARCHAR(2) NOT NULL,

  ativo BIT NOT NULL,
  data_cadastro DATETIME NOT NULL,
  data_ult_alt DATETIME NOT NULL,
)

ALTER TABLE estados
ADD FOREIGN KEY (pais_ID) REFERENCES paises(pais_ID);

CREATE TABLE cidades (
  cidade_ID int NOT NULL PRIMARY KEY IDENTITY,
  estado_ID int NOT NULL, -- Foreign Key

  cidade VARCHAR(100) NOT NULL,
  ddd VARCHAR(2),

  ativo BIT NOT NULL,
  data_cadastro DATETIME NOT NULL,
  data_ult_alt DATETIME NOT NULL,
);

ALTER TABLE cidades
ADD FOREIGN KEY (estado_ID) REFERENCES estados(estado_ID);
