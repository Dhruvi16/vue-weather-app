#!/usr/bin/env sh# 
abort on errors
set -e# build
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git initgit add -Agit commit -m 'deploy'
git push -f git@github.com:dhruvi16/vue-weather-app.git master:gh-pages
cd -