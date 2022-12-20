for dir in ./*/; do
  echo "$dir"
  cd "$dir"
  npm test
  cd ..
done
