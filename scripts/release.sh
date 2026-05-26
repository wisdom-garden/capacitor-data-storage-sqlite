#!/bin/sh

VERSION=$(node -e "console.log(require('./package.json').version)")
TAG="v$VERSION"

echo "Tagging $TAG ..."
git tag "$TAG"
git push origin "$TAG"
echo "Done: $TAG"
