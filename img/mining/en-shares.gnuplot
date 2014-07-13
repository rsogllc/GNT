load "gnuplot.preferences"

set terminal svg size 600,160 font "Sans,12"
set output "en-shares.svg"

set grid
set key opaque box height .1 width 0.1 samplen 0 spacing 0.85 right center
unset ytics
set xtics ("10" 10, "1" 1, "99" 99)
set xlabel "Simulated Distribution Of 100 Random Numbers"
set xrange [0:99]


## We cheat here: instead of illustrating true randomness
## (which---surprise---makes for random graphs), we illustrate a perfect
## distribution with random x values
plot "<for n in $( shuf -i10-99 ) ; do echo $n $(shuf -n1 -i0-99) ; done" u 1:2 title "Invalid Block", \
     "<for n in $( shuf -i1-9 ) ; do echo $n $(shuf -n1 -i0-99) ; done" u 1:2 title   "Share But Not Block", \
     "<for n in $( shuf -i0-0 ) ; do echo $n $(shuf -n1 -i0-99) ; done" u 1:2 title "Share & Block"

set terminal png size 600,160 font "Sans,12"
set output "en-shares.png"

replot
