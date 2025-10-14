#!/usr/bin/env python3
"""
Improved HTML to Markdown Converter

This script converts HTML files to Markdown format with proper handling of:
- Tables with nested elements (strong, em, links)
- Links with proper text extraction
- Whitespace preservation
- Script and style tag filtering

Usage:
    python3 html_to_markdown.py <input.html> <output.md>
    or
    python3 html_to_markdown.py  (uses omop.html -> omop.md)
"""

from html.parser import HTMLParser
import re
import sys

class ImprovedHTMLToMarkdown(HTMLParser):
    def __init__(self):
        super().__init__()
        self.markdown = []
        self.current_tag_stack = []
        self.list_level = 0
        self.list_counters = []
        self.in_pre = False
        self.in_code = False
        self.in_script = False
        self.in_style = False

        # Link handling
        self.current_link_href = None
        self.current_link_text = []

        # Table handling
        self.in_table = False
        self.table_rows = []
        self.current_row = []
        self.current_cell_content = []
        self.is_header_row = False
        self.in_cell = False

        # Formatting within cells
        self.cell_format_stack = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        self.current_tag_stack.append(tag)

        # Skip script and style content
        if tag == 'script':
            self.in_script = True
            return
        elif tag == 'style':
            self.in_style = True
            return

        if self.in_script or self.in_style:
            return

        # Handle tags based on context
        if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            level = int(tag[1])
            self.markdown.append('\n\n' + '#' * level + ' ')
        elif tag == 'p':
            if not self.in_table:
                self.markdown.append('\n\n')
        elif tag == 'br':
            if self.in_cell:
                self.current_cell_content.append('  \n')
            else:
                self.markdown.append('  \n')
        elif tag == 'strong' or tag == 'b':
            if self.in_cell:
                self.current_cell_content.append('**')
                self.cell_format_stack.append('strong')
            else:
                self.markdown.append('**')
        elif tag == 'em' or tag == 'i':
            if self.in_cell:
                self.current_cell_content.append('*')
                self.cell_format_stack.append('em')
            else:
                self.markdown.append('*')
        elif tag == 'code':
            self.in_code = True
            if not self.in_pre:
                if self.in_cell:
                    self.current_cell_content.append('`')
                else:
                    self.markdown.append('`')
        elif tag == 'pre':
            self.in_pre = True
            if not self.in_table:
                self.markdown.append('\n\n```\n')
        elif tag == 'a':
            self.current_link_href = attrs_dict.get('href', '')
            self.current_link_text = []
        elif tag == 'img':
            alt = attrs_dict.get('alt', '')
            src = attrs_dict.get('src', '')
            if self.in_cell:
                self.current_cell_content.append(f'![{alt}]({src})')
            else:
                self.markdown.append(f'![{alt}]({src})')
        elif tag == 'ul':
            if not self.in_table:
                self.markdown.append('\n')
                self.list_level += 1
                self.list_counters.append(None)
        elif tag == 'ol':
            if not self.in_table:
                self.markdown.append('\n')
                self.list_level += 1
                self.list_counters.append(0)
        elif tag == 'li':
            if not self.in_table:
                indent = '  ' * (self.list_level - 1)
                if self.list_counters[-1] is None:
                    self.markdown.append(f'{indent}- ')
                else:
                    self.list_counters[-1] += 1
                    self.markdown.append(f'{indent}{self.list_counters[-1]}. ')
        elif tag == 'hr':
            self.markdown.append('\n\n---\n\n')
        elif tag == 'blockquote':
            if not self.in_table:
                self.markdown.append('\n\n> ')
        elif tag == 'table':
            self.in_table = True
            self.table_rows = []
        elif tag == 'tr':
            self.current_row = []
            self.is_header_row = False
        elif tag == 'th':
            self.is_header_row = True
            self.in_cell = True
            self.current_cell_content = []
        elif tag == 'td':
            self.in_cell = True
            self.current_cell_content = []
        elif tag in ['colgroup', 'col', 'tbody', 'thead']:
            # Ignore these structural tags
            pass

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_script = False
            if self.current_tag_stack and self.current_tag_stack[-1] == tag:
                self.current_tag_stack.pop()
            return
        elif tag == 'style':
            self.in_style = False
            if self.current_tag_stack and self.current_tag_stack[-1] == tag:
                self.current_tag_stack.pop()
            return

        if self.in_script or self.in_style:
            return

        if self.current_tag_stack and self.current_tag_stack[-1] == tag:
            self.current_tag_stack.pop()

        if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.markdown.append('\n')
        elif tag == 'strong' or tag == 'b':
            if self.in_cell and self.cell_format_stack and self.cell_format_stack[-1] == 'strong':
                self.current_cell_content.append('**')
                self.cell_format_stack.pop()
            elif not self.in_cell:
                self.markdown.append('**')
        elif tag == 'em' or tag == 'i':
            if self.in_cell and self.cell_format_stack and self.cell_format_stack[-1] == 'em':
                self.current_cell_content.append('*')
                self.cell_format_stack.pop()
            elif not self.in_cell:
                self.markdown.append('*')
        elif tag == 'code':
            self.in_code = False
            if not self.in_pre:
                if self.in_cell:
                    self.current_cell_content.append('`')
                else:
                    self.markdown.append('`')
        elif tag == 'pre':
            self.in_pre = False
            if not self.in_table:
                self.markdown.append('\n```\n\n')
        elif tag == 'a':
            # Process the link
            link_text = ''.join(self.current_link_text).strip()
            if self.current_link_href:
                link_md = f'[{link_text}]({self.current_link_href})'
                if self.in_cell:
                    self.current_cell_content.append(link_md)
                else:
                    self.markdown.append(link_md)
            else:
                if self.in_cell:
                    self.current_cell_content.append(link_text)
                else:
                    self.markdown.append(link_text)
            self.current_link_href = None
            self.current_link_text = []
        elif tag == 'ul' or tag == 'ol':
            if not self.in_table and self.list_counters:
                self.list_level -= 1
                self.list_counters.pop()
                self.markdown.append('\n')
        elif tag == 'li':
            if not self.in_table:
                self.markdown.append('\n')
        elif tag == 'th' or tag == 'td':
            # Finalize cell content
            cell_text = ''.join(self.current_cell_content).strip()
            # Clean up multiple spaces
            cell_text = re.sub(r'\s+', ' ', cell_text)
            self.current_row.append(cell_text)
            self.in_cell = False
            self.current_cell_content = []
            self.cell_format_stack = []
        elif tag == 'tr':
            if self.in_table and self.current_row:
                self.table_rows.append((self.current_row[:], self.is_header_row))
        elif tag == 'table':
            self.in_table = False
            # Render table
            if self.table_rows:
                self.markdown.append('\n\n')
                for i, (row, is_header) in enumerate(self.table_rows):
                    if row:
                        self.markdown.append('| ' + ' | '.join(row) + ' |\n')
                        if is_header or i == 0:
                            self.markdown.append('| ' + ' | '.join(['---'] * len(row)) + ' |\n')
                self.markdown.append('\n')

    def handle_data(self, data):
        if self.in_script or self.in_style:
            return

        # If we're collecting link text
        if self.current_link_href is not None:
            self.current_link_text.append(data)
            return

        if self.in_cell:
            # Add data to current cell
            self.current_cell_content.append(data)
        elif self.in_table:
            # Ignore data outside cells in tables
            pass
        elif data.strip() or (self.in_pre or self.in_code):
            self.markdown.append(data)
        elif data and not self.in_table:
            # Preserve single space
            if self.markdown and not self.markdown[-1].endswith((' ', '\n')):
                self.markdown.append(' ')

    def get_markdown(self):
        result = ''.join(self.markdown)
        # Clean up extra newlines
        result = re.sub(r'\n{4,}', '\n\n', result)
        result = re.sub(r'^\n+', '', result)
        return result.strip() + '\n'


def convert_html_to_markdown(input_file, output_file):
    """Convert HTML file to Markdown format."""
    print(f"Reading {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    print("Converting to markdown...")
    parser = ImprovedHTMLToMarkdown()
    parser.feed(html_content)
    markdown_content = parser.get_markdown()

    print(f"Writing to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(markdown_content)

    print(f"Conversion complete! Generated {len(markdown_content)} characters")
    return len(markdown_content)


if __name__ == '__main__':
    if len(sys.argv) == 3:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
    elif len(sys.argv) == 1:
        # Default files
        input_file = 'omop.html'
        output_file = 'omop.md'
    else:
        print(__doc__)
        sys.exit(1)

    try:
        convert_html_to_markdown(input_file, output_file)
    except FileNotFoundError as e:
        print(f"Error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error during conversion: {e}")
        sys.exit(1)
