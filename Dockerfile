FROM node:16-alpine

# RUN mkdir myfolder myfolder가 없으면 COPY할 떄, 어차피 자동으로 만들어짐
WORKDIR /myfolder/
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install --production



COPY . /myfolder/
RUN yarn build
CMD yarn start:prod
