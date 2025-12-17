FROM alpine:3.18
RUN apk add --no-cache curl
COPY script.sh .
RUN chmod +x script.sh
CMD ["./script.sh"]
