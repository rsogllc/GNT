load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-compounding.svg"

set key right bottom title "Including Diff. Increases & Electricity:"
unset key
set format y "$%'g"
set xlabel "Weeks Since Starting Mining With Imaginary $2,500 (5 BTC) Equipment" offset -3
set ylabel "Investment Return"

set label 1 "+2% Price / Week & +5% Difficulty / Week\nElectricity Included" at 10,13000 tc ls 2 rotate by 0
set label 2 "-2% Price / Week & +5% Difficulty / Week\n             Electricity Included" at 29,2900 tc ls 1 rotate by 0

set yrange [-2500:14000]

##           Exponential decay: 5% lost to diff increase; 2% gained from price increase
##           |                Geometric progression: 5% diff; 2% price
##           |                |             Intial investment (BTC)
##           |                |             |  Initial electricity price (BTC)
##           |                |             |  |    Compound price (in BTC) decrease
##           |                |             |  |    |               Initial USD price per BTC
##           |_______________ |____________ |  |_   |___________    |__
plot [0:104] ((1-exp(-.03*x))/(1-exp(-.03))-5-(.1*x*(exp(-.02*x))))*500 ls 2, \
             ((1-exp(-.07*x))/(1-exp(-.07))-5-(.1*x*(exp(.02*x))))*500 ls 1

## Fix for PNG label offset
set label 1 "+2% Price / Week & +5% Difficulty / Week" at 12,13900 tc ls 2 rotate by 0
set label 2 "-2% Price / Week & +5% Difficulty / Week" at 34,1900 tc ls 1 rotate by 0

set samples 10000
set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-compounding.png"

replot


