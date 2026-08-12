#
# Code to add IPP Everywhere printers that are not AirPrint.
#
# Usage:
#
#   python[3] add-ippeve-only.py DRIVERLESS.json IPPEVE.json >DRIVERLESS.json
#
# Copyright © 2026 by Michael R Sweet
#

import sys
import json

# Load the AirPrint and IPP Everywhere JSON files provided on the command-line...
with open(sys.argv[1], "r") as file:
    driverless = json.load(file)

with open(sys.argv[2], "r") as file:
    ippeve = json.load(file)

# Copy the driverless printers to stdout...
print("[{\"model\":\"_dummy_\"}",end="")
for printer in driverless:
    if printer["model"] == "_dummy_":
        continue

    model     = printer["model"]
    is_ippeve = printer["ippeve"]

    print(",\n{",end="")
    print(f"\"model\":\"{model}\",\"airprt\":\"1\",\"ippeve\":\"{is_ippeve}\"",end="")
    print("}",end="")


# Loop through the IPP Everywhere printers and generate a driverless entry for each...
for eveprinter in ippeve:
    # Determine whether this printer also supports AirPrint...
    is_airprint = 0
    for printer in driverless:
        if eveprinter["model"] == printer["model"]:
            is_airprint = 1
            break

    # Add this entry if this is not AirPrint...
    if is_airprint == 0:
        model = eveprinter["model"]
        print(",\n{",end="")
        print(f"\"model\":\"{model}\",\"airprt\":\"0\",\"ippeve\":\"1\"",end="")
        print("}",end="")

print("\n]")
