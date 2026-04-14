-- CreateTable
CREATE TABLE "login" (
    "id" SERIAL NOT NULL,
    "usuario" VARCHAR(50) NOT NULL,
    "contraseña" VARCHAR(255) NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "matricula" VARCHAR(20) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "register" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellidos" VARCHAR(50) NOT NULL,
    "correo" VARCHAR(30) NOT NULL,
    "contraseña" VARCHAR(255) NOT NULL,

    CONSTRAINT "register_pkey" PRIMARY KEY ("id")
);