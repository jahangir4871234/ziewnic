import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class ClassInput extends Plugin {
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add('classInput', locale => {
      const view = new ButtonView(locale);
      view.set({
        label: 'Class',
        tooltip: true,
        withText: true
      });

      view.on('execute', () => {
        const selection = editor.model.document.selection;
        const position = selection.getFirstPosition();
        if (!position) {
          return;
        }
        const element = position.parent;
        const currentClass = element.getAttribute('class') || '';
        // Simple input prompt for class name. Editors can type any class.
        const newClass = window.prompt('Enter CSS class (leave empty to remove):', currentClass);
        if (newClass === null) return; // cancelled
        editor.model.change(writer => {
          if (newClass.trim() === '') {
            writer.removeAttribute('class', element);
          } else {
            writer.setAttribute('class', newClass.trim(), element);
          }
        });
      });

      return view;
    });
  }
}
