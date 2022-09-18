import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddSlabService {

  constructor() { }

  
  def selection(self, b1, b2, b3, i1, i2, H, T1, T2, n, s, D, position):
  position = list(position)
  x = position[0]
  y = position[1]
  z = position[2]
  dx1 = -b1
  dx2 = -(b1+b3)
  dx3 = b2+b3
  dx4 = b2
  dx5 = dx2 + (s - D/ 2.0)
  dx6 = dx3 - (s - D/ 2.0)
  dx7 = dx5 + D
  dx8 = dx6 - D
  dz1 = -b1*i1
  dz2 = dz1 + (H - T1 - b3 * i1)
  dz3 = dz1 - (T1 - b3 * i1)
  dz4 = -b2*i2
  dz5 = -T2
  dx9 = dx7 + ((dz3-dz5) + ((s - D/ 2.0) + D)*i1)/((1/n) - i1)
  dx10 = dx8 - ((dz3-dz5) + ((s - D/ 2.0) + D)*i2)/((1/n) - i2)
  dz6 = dz5 + ((dz3-dz5) + ((s - D/ 2.0) + D)*i1)/((1/n) - i1) / n
  dz7 = dz5 + ((dz3-dz5) + ((s - D/ 2.0) + D)*i2)/((1/n) - i2) / n
  dz8 = -T1
  x1 = x + dx1
  x2 = x + dx2
  x3 = x + dx3
  x4 = x + dx4
  x5 = x + dx5
  x6 = x + dx6
  x7 = x + dx7
  x8 = x + dx8
  x9 = x + dx9
  x10 = x + dx10
  z1 = z + dz1
  z2 = z + dz2
  z3 = z + dz3
  z4 = z + dz4
  z5 = z + dz5
  z6 = z + dz6
  z7 = z + dz7
  z8 = z + dz8
  a0 = [x, y, z]
  a1 = [x1, y, z1]
  a2 = [x1, y, z2]
  a3 = [x2, y, z2]
  a4 = [x2, y, z3]
  a5 = [x5, y, z5]
  a6 = [x7, y, z5]
  a7 = [x9, y, z6]
  a8 = [x, y, z8]
  a9 = [x10, y, z7]
  a10 = [x8, y, z5]
  a11 = [x6, y, z5]
  a12 = [x3, y, z3]
  a13 = [x3, y, z2]
  a14 = [x4, y, z2]
  a15 = [x4, y, z4]
  points = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15]
  return points

def createSlab(self, b1, b2, b3, i1, i2, H, T1, T2, n, s, D, L):
  points_BP = self.selection(self, b1, b2, b3, i1, i2, H, T1, T2, n, s, D, position=(0.0,0.0,0.0))
  points_EP = self.selection(self, b1, b2, b3, i1, i2, H, T1, T2, n, s, D, position=(0.0,L,0.0))
  pointlist = [points_BP, points_EP]

  Mesh = []
  for i in range(len(pointlist)-1):
      A1 = pointlist[i]
      A2 = pointlist[i+1]
      A3 = A1[1:]+A1[:1]
      A4 = A2[1:]+A2[:1]
      for j in range(len(A1)):
          Apoints = [A1[j], A3[j], A2[j]]
          Bpoints = [A2[j], A4[j], A3[j]]
          Mesh_A = pv.PolyData(Apoints, [3, 0, 1, 2])
          Mesh.append(Mesh_A)
          Mesh_B = pv.PolyData(Bpoints, [3, 0, 1, 2])
          Mesh.append(Mesh_B)
      Model = Mesh[0]
      for k in range(len(Mesh)-1):
          Model += Mesh[k+1]

  Lib1 = pointlist[0]
  p1 = [Lib1[0],Lib1[1],Lib1[8]]
  p2 = [Lib1[1],Lib1[2],Lib1[3]]
  p3 = [Lib1[1],Lib1[3],Lib1[4]]
  p4 = [Lib1[1],Lib1[4],Lib1[5]]
  p5 = [Lib1[1],Lib1[5],Lib1[6]]
  p6 = [Lib1[1],Lib1[6],Lib1[7]]
  p7 = [Lib1[1],Lib1[7],Lib1[8]]
  p8 = [Lib1[0],Lib1[8],Lib1[15]]
  p9 = [Lib1[8],Lib1[9],Lib1[15]]
  p10 = [Lib1[9],Lib1[10],Lib1[15]]
  p11 = [Lib1[10],Lib1[11],Lib1[15]]
  p12 = [Lib1[11],Lib1[12],Lib1[15]]
  p13 = [Lib1[12],Lib1[13],Lib1[15]]
  p14 = [Lib1[13],Lib1[14],Lib1[15]]
  m1 = pv.PolyData(p1, [3, 0, 1, 2])
  m2 = pv.PolyData(p2, [3, 0, 1, 2])
  m3 = pv.PolyData(p3, [3, 0, 1, 2])
  m4 = pv.PolyData(p4, [3, 0, 1, 2])
  m5 = pv.PolyData(p5, [3, 0, 1, 2])
  m6 = pv.PolyData(p6, [3, 0, 1, 2])
  m7 = pv.PolyData(p7, [3, 0, 1, 2])
  m8 = pv.PolyData(p8, [3, 0, 1, 2])
  m9 = pv.PolyData(p9, [3, 0, 1, 2])
  m10 = pv.PolyData(p10, [3, 0, 1, 2])
  m11 = pv.PolyData(p11, [3, 0, 1, 2])
  m12 = pv.PolyData(p12, [3, 0, 1, 2])
  m13 = pv.PolyData(p13, [3, 0, 1, 2])
  m14 = pv.PolyData(p14, [3, 0, 1, 2])
  Mesh_Lib1 = m1+m2+m3+m4+m5+m6+m7+m8+m9+m10+m11+m12+m13+m14
  Mesh_Lib2 = Move.MoveObject(Move, obj=Mesh_Lib1, coordinate=(0.0,L,0.0))
  Model += Mesh_Lib1 + Mesh_Lib2
  return Model

def createHunch(self, T1, T2, D, n, L):
  Hz = T2 - T1
  Hx1 = D / 2.0
  Hx2  = Hx1 + n * Hz

  H1 = [-Hx1, 0.0, 0.0]
  H2 = [-Hx2, 0.0, Hz]
  H3 = [Hx2, 0.0, Hz]
  H4 = [Hx1, 0.0, 0.0]
  H5 = [-Hx1, L, 0.0]
  H6 = [-Hx2, L, Hz]
  H7 = [Hx2, L, Hz]
  H8 = [Hx1, L, 0.0]
  Hp1 = [H1, H2, H3]
  Hp2 = [H1, H3, H4]
  Hp3 = [H5, H6, H7]
  Hp4 = [H5, H7, H8]
  Hm1 = pv.PolyData(Hp1, [3, 0, 1, 2])
  Hm2 = pv.PolyData(Hp2, [3, 0, 1, 2])
  Hm3 = pv.PolyData(Hp3, [3, 0, 1, 2])
  Hm4 = pv.PolyData(Hp4, [3, 0, 1, 2])
  Model = Hm1 + Hm2 + Hm3 + Hm4

  pointlist = [[H1, H2, H3, H4],[H5, H6, H7, H8]]

  Mesh = []
  for i in range(len(pointlist)-1):
      A1 = pointlist[i]
      A2 = pointlist[i+1]
      A3 = A1[1:]+A1[:1]
      A4 = A2[1:]+A2[:1]
      for j in range(len(A1)):
          Apoints = [A1[j], A3[j], A2[j]]
          Bpoints = [A2[j], A4[j], A3[j]]
          Mesh_A = pv.PolyData(Apoints, [3, 0, 1, 2])
          Mesh.append(Mesh_A)
          Mesh_B = pv.PolyData(Bpoints, [3, 0, 1, 2])
          Mesh.append(Mesh_B)
      for k in range(len(Mesh)):
          Model += Mesh[k]
  return Model

def add_Slab(self, b1, b2, b3, i1, i2, H, T1, T2, n, s, D, L, amount_V, interval_V):
  Model_S = self.createSlab(self, b1, b2, b3, i1, i2, H, T1, T2, n, s, D, L)
  Model_H = self.createHunch(self, T1, T2, D, n, L)

  x = -(amount_V-3.0)*(interval_V/2.0)
  z = -T2
  Models_H = []
  for i in range(int(amount_V)-2):
      Model_H1 = Move.MoveObject(Move, obj=Model_H, coordinate=(x, 0.0, z))
      Models_H.append(Model_H1)
      x += interval_V

  Obj_H = Models_H[0]
  for i in range(len(Models_H)-1):
      Obj_H += Models_H[i+1]

  Obj = Model_S + Obj_H
  return Obj

}
