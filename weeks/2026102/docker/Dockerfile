FROM debian

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y \
  man \
  info 

RUN useradd ysj -d /home/ysj -m -p compsoc -U

COPY src/ysj/ /home/ysj/

RUN chown -R ysj:ysj /home/ysj

RUN chmod 700 /home/ysj/start-server.sh

