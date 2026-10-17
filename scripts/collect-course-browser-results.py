"""Collect real CLI results, not synthetic success markers."""
import json
from pathlib import Path
for source,target in [('course-final-pyodide-log.txt','course-pyodide.json'),('course-flow-log.txt','course-flow.json'),('course-layout-log.txt','course-layout.json'),('course-loading-log.txt','course-loading.json')]:
    lines=Path('test-results',source).read_text(encoding='utf-8-sig').splitlines()
    result=next((json.loads(line) for line in lines if line.startswith('{')),None)
    if result is None:raise RuntimeError('No completed browser result in '+source)
    if result.get('failures',0) or result.get('browserErrors',[]):raise RuntimeError('Browser check failed: '+source)
    Path('test-results',target).write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
    print(target,'PASS')
