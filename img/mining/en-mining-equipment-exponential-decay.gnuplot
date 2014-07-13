set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-exponential-decay.svg"

set grid


plot [0:104] 0.95**x, 0.90**x, 0.85**x 


set terminal png size 600,200 font "Sans,12"
set output "en-mining-equipment-exponential-decay.png"

replot


