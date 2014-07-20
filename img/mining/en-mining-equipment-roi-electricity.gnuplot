load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-electricity.svg"

set key left top Left reverse samplen .01 spacing .7 nobox
unset key
set yrange [-5:20]
set xlabel "Weeks Since Starting Mining With Imaginary 5 BTC Equipment"
set ylabel "Investment Return"
set format y "%'g BTC"

set label 1 "Free Electricity (+5% Diff. / Week)" at 47,17.0 tc ls 1
set label 2 "0.1 BTC / Week Electricity (+5%)" at 47,10.5 tc ls 2 rotate by -4
set label 3 "0.2 BTC / Week Electricity (+5%)" at 47,5.5 tc ls 3 rotate by -10
set label 4 "0.3 BTC / Week (+5%)" at 37,2.0 tc ls 4 rotate by -10

plot [0:104] (1-exp(-.05*x))/(1-exp(-.05))-5 title "Free Electricity @ ~5% Weekly Difficulty Increase" ls 1, \
(1-exp(-.05*x))/(1-exp(-.05))-5-.1*x title "0.1 BTC/Week Electricity @ ~5%" ls 2, \
(1-exp(-.05*x))/(1-exp(-.05))-5-.2*x title "0.2 BTC/Wk" ls 3, \
(1-exp(-.05*x))/(1-exp(-.05))-5-.3*x title "0.3 BTC/Wk" ls 4


## PNG labels are off slightly
set label 1 "Free Electricity (+5% Diff. / Week)" at 47,18.0 tc ls 1
set label 2 "0.1 BTC / Week Electricity (+5%)" at 47,11.5 tc ls 2 rotate by -4
set label 3 "0.2 BTC / Week Electricity (+5%)" at 47,6.5 tc ls 3 rotate by -10
set label 4 "0.3 BTC / Week (+5%)" at 37,3.0 tc ls 4 rotate by -10

set samples 10000
set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-electricity.png"

replot


