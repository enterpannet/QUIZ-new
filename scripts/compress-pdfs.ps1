# บีบ PDF ด้วย Ghostscript — เฉพาะไฟล์ใหญ่ + ตรวจสอบผลลัพธ์ก่อนแทนที่
param(
  [ValidateSet('screen', 'ebook', 'printer')]
  [string]$Preset = 'ebook',
  [long]$MinInputBytes = 10MB,
  [double]$MinOutputRatio = 0.05
)

$gs = (Get-Command gswin64c -ErrorAction SilentlyContinue).Source
if (-not $gs) {
  Write-Error 'gswin64c not found. Install: scoop install ghostscript'
  exit 1
}

$root = Split-Path $PSScriptRoot -Parent
$targets = @(
  Join-Path $root 'public\ecatalogue-medical-food.pdf'
  Join-Path $root 'public\ecatalogue-personalised-food.pdf'
  Join-Path $root 'public\ebooklet.pdf'
) | Where-Object { Test-Path $_ }

function Test-ValidPdf([string]$filePath) {
  if (-not (Test-Path $filePath)) { return $false }
  $bytes = [System.IO.File]::ReadAllBytes($filePath)
  if ($bytes.Length -lt 1024) { return $false }
  $head = [System.Text.Encoding]::ASCII.GetString($bytes[0..4])
  return $head.StartsWith('%PDF')
}

function Compress-Pdf([string]$inputPath) {
  $before = (Get-Item $inputPath).Length
  if ($before -lt $MinInputBytes) {
    Write-Host "SKIP (under min size): $inputPath"
    return $null
  }
  $dir = Split-Path $inputPath -Parent
  $name = [System.IO.Path]::GetFileNameWithoutExtension($inputPath)
  $tmp = Join-Path $dir "$name.__compressing.pdf"
  if (Test-Path $tmp) { Remove-Item $tmp -Force }

  & $gs '-sDEVICE=pdfwrite' '-dCompatibilityLevel=1.4' "-dPDFSETTINGS=/$Preset" '-dNOPAUSE' '-dQUIET' '-dBATCH' "-sOutputFile=$tmp" $inputPath
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path $tmp)) {
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
    Write-Warning "FAILED: $inputPath"
    return $null
  }

  $after = (Get-Item $tmp).Length
  $minOk = [long][math]::Max(102400, $before * $MinOutputRatio)
  if (-not (Test-ValidPdf $tmp) -or $after -lt $minOk -or $after -ge $before) {
    Remove-Item $tmp -Force
    Write-Host "SKIP (bad output): $inputPath"
    return $null
  }

  Move-Item -Path $tmp -Destination $inputPath -Force
  Write-Host ("OK {0:N1} MB -> {1:N1} MB ({2:N0}%): {3}" -f ($before/1MB), ($after/1MB), (100*$after/$before), $inputPath)
  return [pscustomobject]@{ path = $inputPath; before = $before; after = $after }
}

$results = @()
$i = 0
foreach ($path in $targets) {
  $i++
  Write-Host "[$i/$($targets.Count)] $path"
  $r = Compress-Pdf $path
  if ($r) { $results += $r }
}

if ($results.Count -gt 0) {
  $sumBefore = ($results | Measure-Object -Property before -Sum).Sum
  $sumAfter = ($results | Measure-Object -Property after -Sum).Sum
  Write-Host ""
  Write-Host ("Done: {0} files, {1:N1} MB -> {2:N1} MB ({3:N0}%)" -f $results.Count, ($sumBefore/1MB), ($sumAfter/1MB), (100*$sumAfter/$sumBefore))
} else {
  Write-Host 'No files compressed.'
}
