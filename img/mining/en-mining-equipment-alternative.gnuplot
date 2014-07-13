load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-alternative.svg"

#set key left top Left reverse samplen .01 spacing .7 nobox
set key left top reverse Left samplen .01 
set format y "$%'g"

set yrange [-2500:20000]

##            Exponential decay: 5% lost to diff increase; 2% gained from price increase
##            |                 Geometric progression: 5% diff; 2% price
##            |                 |         Intial investment (BTC)
##            |                 |         | Initial electricity price (BTC)
##            |                 |         | |  Compound price (in BTC) decrease
##            |                 |         | |  |           Initial USD price per BTC
##            |________________ |________ | |_ |_________  |__
plot [0:104] ((1-(0.95+.02)**x)/(.05-.02)-5-.1*x*(.98**x))*500 ls 1 title "Mining & Selling Immediately @ 2% Price Increase/Week", \
     500*5*(1.02**x)-2500 ls 3 title "Holding Bitcoins @ 2% Price Increase/Week"


set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-alternative.png"

replot


