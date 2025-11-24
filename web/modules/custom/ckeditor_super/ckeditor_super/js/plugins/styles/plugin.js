import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DropdownView from '@ckeditor/ckeditor5-ui/src/dropdown/dropdownview';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import ListView from '@ckeditor/ckeditor5-ui/src/list/listview';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

export default class Styles extends Plugin {
  init() {
    const editor = this.editor;
    const cfg = editor.config.get('ckeditorSuper') || {};
    const styles = cfg.styleSuggestions || [];

    editor.ui.componentFactory.add('stylesDropdown', locale => {
      const dropdown = new DropdownView(locale);
      dropdown.buttonView.set({
        label: 'Styles',
        tooltip: true,
        withText: true
      });

      const list = new ListView(locale);
      const collection = new Collection();

      // Add entries
      styles.forEach(s => {
        const btn = new ButtonView(locale);
        btn.set({ label: s.name, withText: true });
        btn._classValue = s.class;
        btn.on('execute', () => {
          const selection = editor.model.document.selection;
          const position = selection.getFirstPosition();
          if (!position) return;
          const element = position.parent;
          editor.model.change(writer => {
            writer.setAttribute('class', btn._classValue, element);
          });
        });
        collection.add(btn);
      });

      // Allow clearing style
      const clearBtn = new ButtonView(locale);
      clearBtn.set({ label: 'Clear', withText: true });
      clearBtn.on('execute', () => {
        const selection = editor.model.document.selection;
        const position = selection.getFirstPosition();
        if (!position) return;
        const element = position.parent;
        editor.model.change(writer => {
          writer.removeAttribute('class', element);
        });
      });
      collection.add(clearBtn);

      // Add items to list
      collection.forEach(item => list.items.add({ view: item }));
      dropdown.panelView.children.add(list);

      return dropdown;
    });
  }
}
