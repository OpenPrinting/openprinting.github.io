#!/bin/bash
# Script to clean up Jekyll-specific files after migration to Hugo

echo "This script will remove Jekyll-specific files from the repository."
echo "Make sure you have committed any important changes before proceeding."
echo ""
read -p "Do you want to continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

echo "Removing Jekyll configuration files..."
rm -f _config.yml
rm -f Gemfile
rm -f Gemfile.lock

echo "The following Jekyll directories can be removed manually if not needed:"
echo "  - _includes/"
echo "  - _layouts/ (Jekyll layouts)"
echo "  - _data/"
echo "  - _posts/"
echo "  - _pages/"
echo "  - _gsoc*/  (if migrated)"
echo "  - _gsod*/  (if migrated)"
echo "  - _driverless/"
echo "  - _projects/"
echo "  - _upcoming-technologies/"
echo ""
echo "Note: Some of these directories may still contain important content"
echo "that needs to be migrated to Hugo's content/ structure."
echo ""
echo "Jekyll cleanup completed for configuration files!"
