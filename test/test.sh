#!/bin/bash
set -e
echo "Starting test against zbar (only ASCII, latin1 not supported by zbar):"
while IFS="" read -r p || [ -n "$p" ]
do
  node draw_to_file.js "$p" | tail -n 1 | base64 -d > test.png
  res="$(zbarimg --quiet --raw test.png)"
  if [ "$p" = "$res" ]; then
    echo -n "$p"
    echo -e "\033[32m✓\033[39m"
  else
    echo -n -e "\033[31m"
    echo -n "Test failed at: >$p<"
    echo -e "\033[39m"
    exit 1
  fi
done < test.lst