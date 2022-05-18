cd ./build &&
az webapp up --sku F1 -n detectorapp -g detectors --html &&
cd ..