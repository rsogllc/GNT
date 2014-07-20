load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-alternative.svg"

#set key left top Left reverse samplen .01 spacing .7 nobox
set key left top reverse Left samplen .01 
unset key
set format y "$%'g"
set xlabel "Weeks Since Investing $2,500 In Either Bitcoins Or Imaginary 5 BTC Equipment" offset -4
set ylabel "Investment Return"

set label 1 "Mining At +2% Price & +5% Difficulty / Week\nElectricity Included" at 2,13000 tc ls 2 rotate by 0
set label 2 "                 Owning Bitcoins At\n+2% Price / Week" at 49,5500 tc ls 3 rotate by 0

set yrange [-2500:14000]

## 
plot [0:104] ((1-exp(-.03*x))/(1-exp(-.03))-5-(.1*x*(exp(-.02*x))))*500 ls 2, \
     500*5*exp(.02*x)-2500 ls 3 title "Holding Bitcoins @ 2% Price Increase/Week"

set xlabel "Weeks Since Investing $2,500 In Bitcoins Or Imaginary 5 BTC Equipment" offset -4

set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-alternative.png"

replot


