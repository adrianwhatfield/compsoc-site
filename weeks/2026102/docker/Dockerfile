FROM debian

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y \
  man \
  info 

RUN useradd ysj -d /home/ysj -m -p compsoc -U

COPY src/ysj/.bashrc /home/ysj/.bashrc
COPY src/ysj/example-directory /home/ysj/example-directory

RUN chown -R ysj:ysj /home/ysj

