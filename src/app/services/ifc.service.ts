import { DoubleSide, MeshLambertMaterial } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';

export class IfcService {
  currentModel = -1;
  ifcViewer?: IfcViewerAPI;
  container?: HTMLElement;
  onSelectActions: ((modelID: number, id: number) => void)[];
  ifcProductsType: { [modelID: number]: { [expressID: number]: number } };

  constructor() {
    this.onSelectActions = [];
    this.ifcProductsType = {};
  }

  startIfcViewer(container: HTMLElement) {
    if (!container) return this.notFoundError('container');
    this.container = container;
    this.setupIfcScene();
    this.setupInputs();
  }

  setupIfcScene() {
    if (!this.container) return;
    const preselectMaterial = this.newMaterial(0xFBC02D, 0.2);
    const selectMaterial = this.newMaterial(0xFBC02D, 0.5);
    this.ifcViewer = new IfcViewerAPI({
      container: this.container,
      preselectMaterial,
      selectMaterial
    });
    this.ifcViewer.axes.setAxes();
    this.ifcViewer.grid.setGrid();
    this.ifcViewer.IFC.setWasmPath('assets/');
  }

  setupInputs() {
    if (!this.container) return;
    this.container.onclick = this.handleClick;
    this.container.ondblclick = this.handleDoubleClick;
    this.container.onmousemove = this.handleMouseMove;
  }

  subscribeOnSelect(action: (modelID: number, id: number) => void) {
    this.onSelectActions.push(action);
  }

  async loadIfc(file: File) {
    await this.ifcViewer?.loadIfc(file, true);
  }

  select(modelID: number, expressID: number, pick = true) {
    if (pick) this.ifcViewer?.IFC.pickIfcItemsByID(modelID, [expressID]);
    this.currentModel = modelID;
    this.onSelectActions.forEach((action) => action(modelID, expressID));
  }

  async pick() {
    const found = await this.ifcViewer?.pickIfcItem();
    if (found == null || found == undefined) return;
    this.select(found.modelID, found.id, false);
  }

  private handleClick = (_event: Event) => {

  };

  private handleDoubleClick = async (event: Event) => {
    await this.pick();
  };

  private handleMouseMove = (_event: Event) => {
    this.ifcViewer?.IFC.prePickIfcItem();
  };

  private notFoundError(item: string) {
    throw new Error(`ERROR: ${item} could not be found!`);
  }

  private newMaterial(color: number, opacity: number) {
    return new MeshLambertMaterial({
      color,
      opacity,
      transparent: true,
      depthTest: false,
      side: DoubleSide
    });
  }
}
