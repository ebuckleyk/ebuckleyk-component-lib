# @ebuckleyk/ebuckleyk-component-lib

## 0.12.1

### Patch Changes

- 2d1b9b2: Propogate disable functionality down to individual file item

## 0.12.0

### Minor Changes

- cce7860: Added new readOnly prop for FileDrop component. Use `readOnly={true}` when wanting to display a list of files that are selectable.\n Breaking Change\*: Added disabled prop to RichTextEditor. Use `disabled` prop when wanting to disable RichTextEditor but still desire to display Editor. Use `readOnly` to view an HTML rendered view of Editor content

## 0.11.0

### Minor Changes

- af67ad8: Added capability to render a custom ReactComponent as the drop area

## 0.10.2

### Patch Changes

- d73db30: Fixed issue with serialization when text node is null or undefined

## 0.10.1

### Patch Changes

- f787195: Fixed called map on an undefined object when serializing to plaintext or html

## 0.10.0

### Minor Changes

- a8347c6: Support for node lts instead of latest

## 0.9.0

### Minor Changes

- de11fba: Fixed peer dependencies

## 0.8.0

### Minor Changes

- 3c66629: Moved react and react-dom to rollup externals to ensure no conflict with hooks for React 18

## 0.7.0

### Minor Changes

- 2a7519a: Reduced package size. Support minimum node 18.x

## 0.6.0

### Minor Changes

- 4c89ee1: Changed devDependencies to peerDependencies

## 0.5.0

### Minor Changes

- a4ed742: Updated CSS to only apply to supported markdown operations within slate-editor

## 0.4.1

### Patch Changes

- 202e2c1: Change CSS from direct children to descendants

## 0.4.0

### Minor Changes

- c098cd6: Added default styling and ability to override Textarea and Toolbar

## 0.3.0

### Minor Changes

- 32693a9: Exposed onBlur and onFocus props for RichTextEditor and FileDrop components

## 0.2.0

### Minor Changes

- 67ad25a: Added RichTextEditor helpers for serializing editor text to html or plain text

## 0.1.5

### Patch Changes

- 07b40d9: Fix logic for checking if isFormatActive when text is selected

## 0.1.4

### Patch Changes

- 33e7f41: Added additional unit tests and enabled toggle formatting buttons. Removed unused hovering toolbar

## 0.1.3

### Patch Changes

- 3d5d8d8: Changed fileItem default boxShadow to md from xl

## 0.1.2

### Patch Changes

- bf007b5: Added storybook build output
