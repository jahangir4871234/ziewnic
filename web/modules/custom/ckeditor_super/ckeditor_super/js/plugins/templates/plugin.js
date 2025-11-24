import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DropdownView from '@ckeditor/ckeditor5-ui/src/dropdown/dropdownview';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ListView from '@ckeditor/ckeditor5-ui/src/list/listview';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import { toWidget, viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget/src/utils';

export default class Templates extends Plugin {
  init() {
    const editor = this.editor;
    const cfg = editor.config.get('ckeditorSuper') || {};
    const templates = cfg.templates || [];

    editor.ui.componentFactory.add('insertTemplate', locale => {
      const dropdown = new DropdownView(locale);
      dropdown.buttonView.set({
        label: 'Templates',
        tooltip: true,
        withText: true
      });

      const list = new ListView(locale);
      const collection = new Collection();

      templates.forEach(t => {
        const btn = new ButtonView(locale);
        btn.set({ label: t.name, withText: true });
        btn._html = t.html;
        btn.on('execute', () => {
          // Insert raw HTML at selection by using model change and conversion.
          editor.model.change(writer => {
            // Insert a simple container element 'htmlBlock' and set its 'html' attribute (simple approach).
            const insertPos = editor.model.document.selection.getFirstPosition();
            const fragment = editor.data.processor.toView( btn._html );
            const modelFragment = editor.data.toModel( btn._html );
            writer.insert( modelFragment, insertPos );
          });
        });
        collection.add(btn);
      });

      dropdown.panelView.children.add(list);
      collection.forEach(item => list.items.add({ view: item }));

      return dropdown;
    });
  }
}
