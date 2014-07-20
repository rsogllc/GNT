load "gnuplot.preferences"

set terminal svg size 600,160 font "Sans,12"
set output "en-shares.svg"

set grid
set key opaque box height .1 width 0.1 samplen 0 spacing 0.95 right center
unset ytics
set xtics ("10" 10, "1" 1, "99" 99)
set xlabel "Simulated Distribution Of 100 Random Numbers"
set xrange [0:99]

## We cheat here: instead of illustrating true randomness
## (which---surprise---makes for random graphs), we illustrate a perfect
## distribution with random x values
plot "<for i in $( seq 89 ) ; do echo $( shuf -n1 -i10-99) $(shuf -n1 -i0-99) ; done" u 1:2 title "Invalid Block" lw 2 pt 2, \
     "<for i in $( seq 9 ) ; do echo $(shuf -n1 -i1-9) $(shuf -n1 -i0-99); done" u 1:2 title "Share But Not Block" pt 1 lw 2, \
     "<echo 0 50" u 1:2 title "Share & Block" pt 4 lw 2

set terminal pngcairo size 600,160 font "Sans,12"
set output "en-shares.png"

replot
