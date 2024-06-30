#! /bin/bash

FILE="$HOME"/.config/exboost/desktop.log

# Check if the flag is -f or no flag
if [ "$1" != "-f" ] && [ -n "$1" ]; then
    echo "Invalid flag. Usage: $0 [-f]"
    exit 1
fi

# Check if the flag is -f
if [ "$1" == "-f" ]; then
    # Empty the file before opening
    true > "$FILE"
fi

# Open the file with Codium
codium "$FILE"
