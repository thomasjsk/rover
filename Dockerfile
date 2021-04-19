FROM node:12.16.1-alpine as base

ENV NODE_OPTIONS="--max-old-space-size=4096 --max-http-header-size=100000"

USER node:node

WORKDIR /home/node
COPY --chown=node:node . .
RUN yarn install

FROM base as development

VOLUME /home/node/node_modules

CMD ["mkdir", "dist"]
CMD ["yarn", "run", "start:dev"]

FROM base as production

ENTRYPOINT ["node", "dist/main"]
