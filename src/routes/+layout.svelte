<script>
  import '../tailwind.css';

  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import python from 'highlight.js/lib/languages/python';

  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('python', python);
</script>

<slot />
