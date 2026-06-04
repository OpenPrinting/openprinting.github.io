FROM node:20-bookworm

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

RUN apt-get update && apt-get install -y \
    foomatic-db-engine \
    foomatic-db-compressed-ppds \
    cups-filters \
    ghostscript \
    bsdmainutils \
    libxml2-utils \
    xsltproc \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*
