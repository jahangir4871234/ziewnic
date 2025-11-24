<?php

namespace Drupal\ckeditor_super\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class CKEditorSuperSettingsForm extends ConfigFormBase {

  protected function getEditableConfigNames() {
    return ['ckeditor_super.settings'];
  }

  public function getFormId() {
    return 'ckeditor_super_settings_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('ckeditor_super.settings');

    $form['enabled'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable CKEditor Super features'),
      '#default_value' => $config->get('enabled'),
    ];

    $form['class_suggestions'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Class suggestions (one per line)'),
      '#default_value' => implode("\n", $config->get('class_suggestions') ?: []),
      '#description' => $this->t('Provide example classes. Editors can still type any class.'),
    ];

    $form['style_suggestions'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Style suggestions (Label|class, one per line)'),
      '#default_value' => $this->styleSuggestionsToText($config->get('style_suggestions') ?: []),
      '#description' => $this->t('Lines like: Button|btn btn-primary'),
    ];

    $form['templates'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Templates (Label|HTML, one per line; pipe separates)'),
      '#default_value' => $this->templatesToText($config->get('templates') ?: []),
      '#description' => $this->t('Each line: Label|HTML. Example: CTA|<div class="cta">...</div>'),
      '#attributes' => ['style' => 'font-family: monospace;'],
    ];

    $form['editor_css'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Editor CSS path (relative to site root)'),
      '#default_value' => $config->get('editor_css') ?: '',
      '#description' => $this->t('Optional: a CSS file to load inside the editor iframe to preview frontend styles. Example: /themes/custom/mytheme/css/editor-styles.css'),
    ];

    return parent::buildForm($form, $form_state);
  }

  private function styleSuggestionsToText($arr) {
    $lines = [];
    foreach ($arr as $item) {
      if (is_array($item) && isset($item['name']) && isset($item['class'])) {
        $lines[] = $item['name'] . '|' . $item['class'];
      }
    }
    return implode("\n", $lines);
  }

  private function templatesToText($arr) {
    $lines = [];
    foreach ($arr as $item) {
      if (is_array($item) && isset($item['name']) && isset($item['html'])) {
        $html = str_replace("\n", ' ', $item['html']);
        $lines[] = $item['name'] . '|' . $html;
      }
    }
    return implode("\n", $lines);
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();

    $class_lines = preg_split('/\r?\n/', trim($values['class_suggestions']));
    $classes = [];
    foreach ($class_lines as $l) {
      $l = trim($l);
      if ($l !== '') $classes[] = $l;
    }

    $style_lines = preg_split('/\r?\n/', trim($values['style_suggestions']));
    $styles = [];
    foreach ($style_lines as $l) {
      $parts = explode('|', $l, 2);
      if (count($parts) == 2) {
        $styles[] = ['name' => trim($parts[0]), 'class' => trim($parts[1])];
      }
    }

    $template_lines = preg_split('/\r?\n/', trim($values['templates']));
    $templates = [];
    foreach ($template_lines as $l) {
      $parts = explode('|', $l, 2);
      if (count($parts) == 2) {
        $templates[] = ['name' => trim($parts[0]), 'html' => trim($parts[1])];
      }
    }

    $this->config('ckeditor_super.settings')
      ->set('enabled', !empty($values['enabled']))
      ->set('class_suggestions', $classes)
      ->set('style_suggestions', $styles)
      ->set('templates', $templates)
      ->set('editor_css', trim($values['editor_css']))
      ->save();

    parent::submitForm($form, $form_state);
  }
}
