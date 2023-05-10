import numpy as np
import matplotlib.pyplot as plt

ax = plt.axes()
ax.quiver(0,0,1,1,color=(1, 0, 0, 0.3),angles='xy', scale_units='xy', scale=1)
ax.quiver([0,0],[0,0],[1,0],[0,1],color=[(1, 0, 0, 0.3), (0, 1, 0, 0.3)],angles='xy', scale_units='xy', scale=1)
ax.grid()
ax.set_xlabel('X')
ax.set_xlim(-1, 1)
ax.set_ylabel('Y')
ax.set_ylim(-1, 1)

plt.text(0,    0.85,"a")
plt.text(0.85, 0   ,"b")

plt.show()