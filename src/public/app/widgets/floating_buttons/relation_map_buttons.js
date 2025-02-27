import NoteContextAwareWidget from "../note_context_aware_widget.js";
import dialogService from "../dialog.js";
import server from "../../services/server.js";
import toastService from "../../services/toast.js";

const TPL = `
<div>
    <button class="relation-map-create-child-note btn btn-sm floating-button no-print" type="button"
                title="Create new child note and add it into this relation map">
        <span class="bx bx-folder-plus"></span>
    
        Create child note
    </button>
    
    <button type="button"
            class="relation-map-reset-pan-zoom btn icon-button floating-button bx bx-crop no-print"
            title="Reset pan & zoom to initial coordinates and magnification"
            style="right: 100px;"></button>
    
    <div class="btn-group floating-button no-print" style="right: 10px;">
        <button type="button"
                class="relation-map-zoom-in btn icon-button bx bx-zoom-in"
                title="Zoom In"></button>
    
        <button type="button"
                class="relation-map-zoom-out btn icon-button bx bx-zoom-out"
                title="Zoom Out"></button>
    </div>
</div>`;

export default class RelationMapButtons extends NoteContextAwareWidget {
    isEnabled() {
        return super.isEnabled() && this.note?.type === 'relation-map';
    }

    doRender() {
        super.doRender();

        this.$widget = $(TPL);
        this.$createChildNote = this.$widget.find(".relation-map-create-child-note");
        this.$zoomInButton = this.$widget.find(".relation-map-zoom-in");
        this.$zoomOutButton = this.$widget.find(".relation-map-zoom-out");
        this.$resetPanZoomButton = this.$widget.find(".relation-map-reset-pan-zoom");

        this.$createChildNote.on('click', () => this.triggerEvent('relationMapCreateChildNote', {ntxId: this.ntxId}));
        this.$resetPanZoomButton.on('click', () => this.triggerEvent('relationMapResetPanZoom', {ntxId: this.ntxId}));

        this.$zoomInButton.on('click', () => this.triggerEvent('relationMapResetZoomIn', {ntxId: this.ntxId}));
        this.$zoomOutButton.on('click', () => this.triggerEvent('relationMapResetZoomOut', {ntxId: this.ntxId}));
    }
}
