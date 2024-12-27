# Size-me React Component

Sizeme collects width and change information from your component.

## Example

```tsx
<SizeMe>
  {({ width, height }) => (
    <div>
      Width: {width}px, Height: {height}px
    </div>
  )}
</SizeMe>
```

## Notes

If you define a minimum width or height in the child component within Sizeme, you will have problems with the information provided by Sizeme.
