load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-compounding.svg"

set key right bottom title "Including Diff. Increases & Electricity:"
set format y "$%'g" ## doesn't render in PNG here

set yrange [-2500:20000]

##            Exponential decay: 5% lost to diff increase; 2% gained from price increase
##            |                 Geometric progression: 5% diff; 2% price
##            |                 |         Intial investment (BTC)
##            |                 |         | Initial electricity price (BTC)
##            |                 |         | |  Compound price (in BTC) decrease
##            |                 |         | |  |           Initial USD price per BTC
##            |________________ |________ | |_ |_________  |__
plot [0:104] ((1-(0.95+.02)**x)/(.05-.02)-5-.1*x*(.98**x))*500 ls 1 title "2% Price Increase/Week", \
     ((1-(0.95-.02)**x)/(.05+.02)-5-.1*x*(1.02**x))*500 ls 2 title "2% Price Decrease/Week"

set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-compounding.png"

replot


