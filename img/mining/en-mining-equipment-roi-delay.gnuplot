load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-delay.svg"

set key left top samplen 0 reverse Left
unset key
set yrange [-5:20]
set ylabel "Investment Return"
set xlabel "Weeks Since Starting Mining At 1 Bitcoin / Week"
set xlabel "Weeks Since Mining Could've Started With Imaginary 5 BTC Equipment" offset -3,0
set format y "%'g BTC"
set xtics (2, 20, 40, 60, 80, 100)

set label "+5% Difficulty / Week" at 60,15 tc ls 1
set label "+10% Difficulty / Week" at 60,6 tc ls 2
set label "+15% Difficulty / Week" at 60,-2 tc ls 3

plot [0:104] x>2 ? (1-exp(-.05*x))/(1-exp(-.05))-(1-exp(-.05*2))/(1-exp(-.05))-5 : 1/0 ls 1 title "+5%", \
x>2 ? (1-exp(-.10*x))/(1-exp(-.10))-(1-exp(-.10*2))/(1-exp(-.10))-5 : 1/0 ls 2 title "+10%", \
x>2 ? (1-exp(-.15*x))/(1-exp(-.15))-(1-exp(-.15*2))/(1-exp(-.15))-5 : 1/0 ls 3 title "+15%" 

set samples 10000
set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-delay.png"

replot


