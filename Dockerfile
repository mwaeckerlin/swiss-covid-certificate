FROM mwaeckerlin/nodejs-build as build
ENV NODE_ENV "production"
ADD --chown=somebody package.json package.json
ADD --chown=somebody package-lock.json package-lock.json
RUN NODE_ENV=development npm install
ADD --chown=somebody . .
RUN node_modules/.bin/react-app-rewired build

FROM mwaeckerlin/nginx
ENV CONTAINERNAME "SwissCovidCertificate"
COPY --from=build /app/build /app