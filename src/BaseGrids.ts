import { Color } from "@ngageoint/color-js";
import TreeMap from "ts-treemap";
import { BaseGrid } from "./BaseGrid";
import { BaseZoomGrids } from "./BaseZoomGrids";
import { GridConstants } from "./GridConstants";
import { GridStyle } from "./GridStyle";
import { Labeler } from "./Labeler";
import { GridProperties } from "./property/GridProperties";
import { PropertyConstants } from "./property/PropertyConstants";

/**
 * Grids
 * 
 * @author osbornb
 * @param <TGrid>
 *            grid type
 * @param <TZoomGrids>
 *            zoom grids type
 */
export abstract class BaseGrids<TGrid extends BaseGrid, TZoomGrids extends BaseZoomGrids<TGrid>> {

    /**
     * Grid properties
     */
    protected readonly properties: GridProperties;

    /**
     * Map between zoom levels and grids
     */
    private zoomGrids = new TreeMap<number, TZoomGrids>();

    /**
     * Constructor
     * 
     * @param properties
     *            grid properties
     */
    constructor(properties: GridProperties) {
        this.properties = properties;
    }

    /**
     * Get the default grid line width
     * 
     * @return width
     */
    public abstract getDefaultWidth(): number;

    /**
     * Get the grids
     * 
     * @return grids
     */
    public abstract grids(): TGrid[];

    /**
     * Create a new zoom grids
     * 
     * @param zoom
     *            zoom level
     * @return zoom grids
     */
    protected abstract newZoomGrids(zoom: number): TZoomGrids;

    /**
     * Load the grid
     * 
     * @param grid
     *            name
     * @param gridKey
     *            grid name key
     * @param enabled
     *            enable created grids
     * @param labeler
     *            grid labeler
     */
    protected loadGrid(grid: TGrid, gridKey: string, labeler: Labeler, enabled?: boolean,
    ): void {
        if (enabled === null || enabled === undefined) {
            enabled = this.properties.getBooleanProperty(false,
                PropertyConstants.GRIDS, gridKey,
                PropertyConstants.ENABLED);
            if (enabled == null) {
                enabled = true;
            }
        }
        grid.setEnabled(enabled);

        let minZoom = this.properties.getIntegerProperty(false,
            PropertyConstants.GRIDS, gridKey, PropertyConstants.MIN_ZOOM);
        if (!minZoom) {
            minZoom = 0;
        }
        grid.setMinZoom(minZoom);

        const maxZoom = this.properties.getIntegerProperty(false,
            PropertyConstants.GRIDS, gridKey, PropertyConstants.MAX_ZOOM);
        grid.setMaxZoom(maxZoom);

        const linesMinZoom = this.properties.getIntegerProperty(false,
            PropertyConstants.GRIDS, gridKey, PropertyConstants.LINES,
            PropertyConstants.MIN_ZOOM);
        grid.setLinesMinZoom(linesMinZoom);

        const linesMaxZoom = this.properties.getIntegerProperty(false,
            PropertyConstants.GRIDS, gridKey, PropertyConstants.LINES,
            PropertyConstants.MAX_ZOOM);
        grid.setLinesMaxZoom(linesMaxZoom);

        const colorProperty = this.properties.getProperty(false, this.properties.buildProperty([PropertyConstants.GRIDS, gridKey, PropertyConstants.COLOR]));
        const color = colorProperty != null ? Color.color(colorProperty)
            : Color.black();
        grid.setColor(color);

        let width = this.properties.getDoubleProperty(false,
            PropertyConstants.GRIDS, gridKey, PropertyConstants.WIDTH);
        if (!width) {
            width = this.getDefaultWidth();
        }
        grid.setWidth(width);

        if (labeler) {
            this.loadLabeler(labeler, gridKey);
        }
        grid.setLabeler(labeler);

    }

    /**
     * Load the labeler
     * 
     * @param labeler
     *            labeler
     * @param gridKey
     *            grid name key
     */
    private loadLabeler(labeler: Labeler, gridKey: string): void {

        const enabled = this.properties.getBooleanProperty(false,
            PropertyConstants.GRIDS, gridKey, PropertyConstants.LABELER,
            PropertyConstants.ENABLED);
        labeler.setEnabled(enabled !== null && enabled !== undefined && enabled);

        const minZoom = this.properties.getIntegerProperty(false,
            PropertyConstants.GRIDS, gridKey, PropertyConstants.LABELER,
            PropertyConstants.MIN_ZOOM);
        if (minZoom) {
            labeler.setMinZoom(minZoom);
        }

        const maxZoom = this.properties.getIntegerProperty(false,
            PropertyConstants.GRIDS, gridKey, PropertyConstants.LABELER,
            PropertyConstants.MAX_ZOOM);
        if (maxZoom) {
            labeler.setMaxZoom(maxZoom);
        }

        const color = this.properties.getProperty(false, this.properties.buildProperty([PropertyConstants.GRIDS,
            gridKey, PropertyConstants.LABELER, PropertyConstants.COLOR]));
        if (color) {
            labeler.setColor(Color.color(color));
        }

        const textSize = this.properties.getDoubleProperty(false,
            PropertyConstants.GRIDS, gridKey, PropertyConstants.LABELER,
            PropertyConstants.TEXT_SIZE);
        if (textSize) {
            labeler.setTextSize(textSize);
        }

        const buffer = this.properties.getDoubleProperty(false,
            PropertyConstants.GRIDS, gridKey, PropertyConstants.LABELER,
            PropertyConstants.BUFFER);
        if (buffer) {
            labeler.setBuffer(buffer);
        }

    }

    /**
     * Load the grid style color
     * 
     * @param gridKey
     *            grid name key
     * @param gridKey2
     *            second grid name key
     * @return color
     */
    protected loadGridStyleColor(gridKey: string, gridKey2: string): Color | undefined {
        const colorProperty = this.properties.getProperty(false,
            this.properties.buildProperty([PropertyConstants.GRIDS, gridKey, gridKey2,
            PropertyConstants.COLOR]));
        let color: Color | undefined;
        if (colorProperty) {
            color = Color.color(colorProperty);
        }
        return color;
    }

    /**
     * Load the grid style width
     * 
     * @param gridKey
     *            grid name key
     * @param gridKey2
     *            second grid name key
     * @return width
     */
    protected loadGridStyleWidth(gridKey: string, gridKey2: string): number | undefined {
        return this.properties.getDoubleProperty(false, this.properties.buildProperty([PropertyConstants.GRIDS,
            gridKey, gridKey2, PropertyConstants.WIDTH]));
    }

    /**
     * Get a combined grid style from the provided color, width, and grid
     * 
     * @param grid
     *            grid
     * @param color
     *            color
     * @param width
     *            width
     * @return grid style
     */
    protected getGridStyle(grid: TGrid, color?: Color, width?: number): GridStyle {

        if (!color) {
            color = grid.getColor();
        }

        if (width === null || width === undefined || width === 0) {
            width = grid.getWidth();
        }

        return GridStyle.style(color, width);
    }

    /**
     * Create the zoom level grids
     */
    protected createZoomGrids(): void {
        for (let zoom = 0; zoom <= GridConstants.MAX_MAP_ZOOM_LEVEL; zoom++) {
            this.createZoomGridsFromZoom(zoom);
        }
    }

    /**
     * Get the grids for the zoom level
     * 
     * @param zoom
     *            zoom level
     * @return grids
     */
    public getGrids(zoom: number): TZoomGrids | undefined {
        let grids = this.zoomGrids.get(zoom);
        if (!grids) {
            grids = this.createZoomGridsFromZoom(zoom);
        }
        return grids;
    }

    /**
     * Create grids for the zoom level
     * 
     * @param zoom
     *            zoom level
     * @return grids
     */
    private createZoomGridsFromZoom(zoom: number): TZoomGrids {
        let zoomLevelGrids = this.newZoomGrids(zoom);
        for (const grid of this.grids()) {
            if (grid.isEnabled() && grid.isWithin(zoom)) {
                zoomLevelGrids.addGrid(grid);
            }
        }
        this.zoomGrids.set(zoom, zoomLevelGrids);
        return zoomLevelGrids;
    }

    /**
     * Enable grids
     * 
     * @param grids
     *            grids
     */
    public enableGrids(grids: TGrid[]): void {
        for (const grid of grids) {
            this.enable(grid);
        }
    }

    /**
     * Disable grids
     * 
     * @param grids
     *            grids
     */
    public disableGrids(grids: TGrid[]): void {
        for (const grid of grids) {
            this.disable(grid);
        }
    }

    /**
     * Enable the grid
     * 
     * @param grid
     *            grid
     */
    public enable(grid: TGrid): void {

        if (!grid.isEnabled()) {

            grid.setEnabled(true);

            const minZoom = grid.getMinZoom();
            let maxZoom = grid.getMaxZoom();
            if (!maxZoom) {
                maxZoom = this.zoomGrids.lastKey();
            }

            for (let zoom = minZoom; zoom <= maxZoom!; zoom++) {
                this.addGrid(grid, zoom);
            }

        }

    }

    /**
     * Disable the grid
     * 
     * @param grid
     *            grid
     */
    public disable(grid: TGrid): void {

        if (grid.isEnabled()) {

            grid.setEnabled(false);

            const minZoom = grid.getMinZoom();
            let maxZoom = grid.getMaxZoom();
            if (!maxZoom) {
                maxZoom = this.zoomGrids.lastKey();
            }

            for (let zoom = minZoom; zoom <= maxZoom!; zoom++) {
                this.removeGrid(grid, zoom);
            }

        }

    }

    /**
     * Set the grid minimum zoom
     * 
     * @param grid
     *            grid
     * @param minZoom
     *            minimum zoom
     */
    public setMinZoom(grid: TGrid, minZoom: number): void {
        let maxZoom = grid.getMaxZoom();
        if (maxZoom && maxZoom < minZoom) {
            maxZoom = minZoom;
        }
        this.setZoomRange(grid, minZoom, maxZoom);
    }

    /**
     * Set the grid maximum zoom
     * 
     * @param grid
     *            grid
     * @param maxZoom
     *            maximum zoom
     */
    public setMaxZoom(grid: TGrid, maxZoom?: number): void {
        let minZoom = grid.getMinZoom();
        if (maxZoom && minZoom > maxZoom) {
            minZoom = maxZoom;
        }
        this.setZoomRange(grid, minZoom, maxZoom);
    }

    /**
     * Set the grid zoom range
     * 
     * @param grid
     *            grid
     * @param minZoom
     *            minimum zoom
     * @param maxZoom
     *            maximum zoom
     */
    public setZoomRange(grid: TGrid, minZoom: number, maxZoom?: number): void {

        if (maxZoom && maxZoom < minZoom) {
            throw new Error("Min zoom '" + minZoom
                + "' can not be larger than max zoom '" + maxZoom + "'");
        }

        // All grids zoom range
        const allGridsMin = this.zoomGrids.firstKey();
        const allGridsMax = this.zoomGrids.lastKey();

        // Existing grid zoom range
        let gridMinZoom = grid.getMinZoom();
        let gridMaxZoom = grid.getMaxZoom();
        if (!gridMaxZoom) {
            gridMaxZoom = allGridsMax;
        } else {
            gridMaxZoom = Math.min(gridMaxZoom, allGridsMax!);
        }

        grid.setMinZoom(minZoom);
        grid.setMaxZoom(maxZoom);

        minZoom = Math.max(minZoom, allGridsMin!);
        if (!maxZoom) {
            maxZoom = allGridsMax;
        } else {
            maxZoom = Math.min(maxZoom, allGridsMax!);
        }

        const minOverlap = Math.max(minZoom, gridMinZoom);
        const maxOverlap = Math.min(maxZoom!, gridMaxZoom!);

        const overlaps = minOverlap <= maxOverlap;

        if (overlaps) {

            const min = Math.min(minZoom, gridMinZoom);
            const max = Math.max(maxZoom!, gridMaxZoom!);

            for (let zoom = min; zoom <= max; zoom++) {

                if (zoom < minOverlap || zoom > maxOverlap) {

                    if (zoom >= minZoom && zoom <= maxZoom!) {
                        this.addGrid(grid, zoom);
                    } else {
                        this.removeGrid(grid, zoom);
                    }

                }

            }
        } else {

            for (let zoom = gridMinZoom; zoom <= gridMaxZoom!; zoom++) {
                this.removeGrid(grid, zoom);
            }

            for (let zoom = minZoom; zoom <= maxZoom!; zoom++) {
                this.addGrid(grid, zoom);
            }
        }
    }

    /**
     * Add a grid to the zoom level
     * 
     * @param grid
     *            grid
     * @param zoom
     *            zoom level
     */
    private addGrid(grid: TGrid, zoom: number): void {
        const grids = this.zoomGrids.get(zoom);
        if (grids) {
            grids.addGrid(grid);
        }
    }

    /**
     * Remove a grid from the zoom level
     * 
     * @param grid
     *            grid
     * @param zoom
     *            zoom level
     */
    private removeGrid(grid: TGrid, zoom: number): void {
        const grids = this.zoomGrids.get(zoom);
        if (grids) {
            grids.removeGrid(grid);
        }
    }

    /**
     * Enable all grid labelers
     */
    public enableAllLabelers(): void {
        for (const grid of this.grids()) {
            const labeler = grid.getLabeler();
            if (labeler) {
                labeler.setEnabled(true);
            }
        }
    }

    /**
     * Set all label grid edge buffers
     * 
     * @param buffer
     *            label buffer (greater than or equal to 0.0 and less than 0.5)
     */
    public setAllLabelBuffers(buffer: number): void {
        for (const grid of this.grids()) {
            const labeler = grid.getLabeler();
            if (labeler) {
                labeler.setBuffer(buffer);
            }
        }
    }

}
